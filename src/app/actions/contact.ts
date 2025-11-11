"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { contactSchema } from "@/lib/validations/contact";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API!);

export async function submitContact(formData: FormData) {
  const data = {
    name: (formData.get("name") ?? "").toString().trim(),
    email: (formData.get("email") ?? "").toString().trim(),
    message: (formData.get("message") ?? "").toString().trim(),
  };

  // Validate with Zod
  const validation = contactSchema.safeParse(data);
  if (!validation.success) {
    console.error("Validation errors:", validation.error.format());
    return {
      success: false,
      error: "Validation failed",
      details: validation.error.format(),
    };
  }

  try {
    // Save to database
    const contact = await prisma.contactSubmission.create({
      data: validation.data,
    });

    // Send email via Resend
    await resend.emails.send({
      from: "onboarding@resend.dev", // make sure this is a verified sender
      to: "alexandru.theodor.moise@gmail.com",
      subject: `New Contact Form Submission from ${validation.data.name}`,
      html: `
        <h3>New Contact Form Submission</h3>
        <p><strong>Name:</strong> ${validation.data.name}</p>
        <p><strong>Email:</strong> ${validation.data.email}</p>
        <p><strong>Message:</strong></p>
        <p>${validation.data.message.replace(/\n/g, "<br>")}</p>
      `,
    });

    revalidatePath("/"); // optional: refresh pages

    return { success: true, id: contact.id };
  } catch (err) {
    console.error("Contact form submission error:", err);
    return {
      success: false,
      error: "Something went wrong. Please try again.",
    };
  }
}

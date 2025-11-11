export default function StructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "YOUR NAME",
    jobTitle: "Full-Stack Developer",
    description:
      "Your description",
    url: "YOUR WEBSITE",
    image: "your-domain/profile.png",
    sameAs: [
      "https://github.com/USERNAME",
      "https://linkedin.com/in/PROFILE",
    ],
    knowsAbout: [
      "Placeholder 1"
      "Placeholder 2"
      "Placeholder 3"
      "Placeholder 4"
      "Placeholder 5"
      "Placeholder 6"
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}

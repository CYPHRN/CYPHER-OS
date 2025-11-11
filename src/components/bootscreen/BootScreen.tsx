import { Spinner } from "@/components/ui/spinner";
import FadeContent from "@/components/ui/react-bits/FadeContent";
import TextType from "@/components/ui/react-bits/TextType";
import FadeOut from "@/components/ui/react-bits/FadeOut";

export default function BootScreen() {
  return (
    <FadeOut
      duration={1000}
      delay={4000}
      blur={true}
      className="fixed inset-0 bg-black flex flex-col items-center justify-center gap-1"
    >
      <FadeContent
        duration={1000}
        easing="ease-out"
        initialOpacity={100}
        className="fixed inset-0 bg-black flex flex-col items-center justify-center gap-1"
      >
        <div className="mb-15">
          <FadeContent duration={1000} easing="ease-out" initialOpacity={0}>
            <img
              src="/logo.svg"
              className="w-[18rem] h-[8rem]"
              alt="CYPHER OS Logo"
            />
          </FadeContent>
          <div className="flex flex-col items-center gap-2">
            <TextType
              text="Loading CYPHER OS..."
              typingSpeed={30}
              pauseDuration={1500}
              showCursor={true}
              cursorCharacter=""
              initialDelay={1250}
              variableSpeed={false}
              onSentenceComplete={() => {}}
            />
            <FadeContent
              blur={true}
              duration={1000}
              easing="ease-out"
              initialOpacity={0}
              delay={2000}
            >
              <Spinner className="size-8" />
            </FadeContent>
          </div>
        </div>
      </FadeContent>
    </FadeOut>
  );
}

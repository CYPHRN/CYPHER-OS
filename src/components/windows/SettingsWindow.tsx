import { DesktopSettings } from "@/types";

interface SettingsWindowProps {
  settings: DesktopSettings;
  onUpdateSettings: (updates: Partial<DesktopSettings>) => void;
  onResetSettings: () => void;
  onTriggerScreensaver: () => void;
}

export default function SettingsWindow({
  settings,
  onUpdateSettings,
  onResetSettings,
  onTriggerScreensaver,
}: SettingsWindowProps) {
  const backgrounds = [
    { id: "hexagon", label: "Hexagon", class: "bg-hexagon" },
    { id: "abstract", label: "Abstract", class: "bg-abstract" },
    { id: "minimal", label: "Minimal", class: "bg-minimal" },
  ];

  const cursors = [
    { id: "default", label: "Default" },
    { id: "pointer", label: "Large Pointer" },
    { id: "funny", label: "Monkey" },
  ];

  return (
    <div
      className="
        w-full h-full overflow-y-auto
        p-6 space-y-8
        bg-[#141414]
        border-t border-[#3b3838]
        text-white
      "
    >
      {/* Background Section */}
      <section>
        <h3 className="text-lg font-semibold mb-4">Background</h3>
        <div className="grid grid-cols-3 gap-4">
          {backgrounds.map((bg) => (
            <div
              key={bg.id}
              onClick={() => onUpdateSettings({ background: bg.id as any })}
              className={`
                h-24 rounded-xl cursor-pointer border-2 transition-all duration-200
                ${bg.class}
                ${
                  settings.background === bg.id
                    ? "border-yellow-500 ring-2 ring-yellow-500/50"
                    : "border-[#3b3838] hover:border-[#6e6767]"
                }
              `}
            >
              <div className="w-full h-full flex items-end p-2 bg-black/30 rounded-b-xl">
                <span className="text-xs font-medium text-white bg-black/40 px-2 py-1 rounded">
                  {bg.label}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Cursor Section */}
      <section>
        <h3 className="text-lg font-semibold mb-4">Cursor Style</h3>
        <div className="space-y-2">
          {cursors.map((cursor) => (
            <label
              key={cursor.id}
              className="
                flex items-center gap-3 p-3 rounded-lg
                border border-[#3b3838] hover:border-yellow-500/40
                bg-[#1a1a1a]/40
                cursor-pointer transition-all
              "
            >
              <input
                type="radio"
                name="cursor"
                value={cursor.id}
                checked={settings.cursor === cursor.id}
                onChange={() => onUpdateSettings({ cursor: cursor.id as any })}
                className="w-4 h-4 text-yellow-500 focus:ring-yellow-500"
              />
              <span className="text-sm">{cursor.label}</span>
            </label>
          ))}
        </div>
      </section>

      {/* Screensaver Section */}
      <section className="flex flex-col gap-2">
        <h3 className="text-lg font-semibold mb-4">Screensaver</h3>
        <div
          className="
            flex items-center justify-between p-3 rounded-lg
            border border-[#3b3838] bg-[#1a1a1a]/40
          "
        >
          <span>Enable Screensaver</span>
          <button
            onClick={() =>
              onUpdateSettings({
                screensaver: {
                  enabled: !settings.screensaver.enabled,
                  timeout: 2,
                },
              })
            }
            className={`
              relative w-12 h-6 rounded-full transition-colors
              ${settings.screensaver.enabled ? "bg-yellow-500" : "bg-gray-600"}
            `}
          >
            <div
              className={`
                absolute top-1 w-4 h-4 bg-white rounded-full transition-transform
                ${settings.screensaver.enabled ? "left-7" : "left-1"}
              `}
            />
          </button>
        </div>
        <div className="flex justify-end">
          <button
            onClick={() => {
              onTriggerScreensaver();
            }}
            className="
      w-2/6 text-center text-sm p-3 rounded-lg
      border border-[#3b3838] bg-[#1a1a1a]/40
      hover:bg-[#3b3838]/60 hover:border-yellow-500/50
      transition-colors
    "
          >
            <span>Trigger Screensaver</span>
          </button>
        </div>
      </section>

      {/* Reset Button */}
      <div className="pt-4 border-t border-[#3b3838]">
        <button
          onClick={onResetSettings}
          className="
            w-full px-4 py-2 rounded-lg
            bg-[#1a1a1a]/60 hover:bg-[#3b3a3a]/70
            border border-[#3b3838] hover:border-yellow-500/40
            text-white font-medium transition-all
          "
        >
          Reset to Defaults
        </button>
      </div>
    </div>
  );
}

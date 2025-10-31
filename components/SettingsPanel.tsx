import React from 'react';

interface SettingsPanelProps {
  fontSize: number;
  onFontSizeChange: (size: number) => void;
  fontColor: string;
  onFontColorChange: (color: string) => void;
  onClose: () => void;
}

const PRESET_COLORS = ['#FFFFFF', '#FFFF00', '#00FFFF', '#00FF00', '#FF69B4'];

export const SettingsPanel: React.FC<SettingsPanelProps> = ({
  fontSize,
  onFontSizeChange,
  fontColor,
  onFontColorChange,
  onClose,
}) => {
  // Prevent clicks inside the panel from closing the modal
  const handlePanelClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-30 transition-opacity duration-300"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="settings-title"
    >
      <div
        className="bg-gray-800 p-6 rounded-lg shadow-xl w-full max-w-sm m-4 text-white"
        onClick={handlePanelClick}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 id="settings-title" className="text-2xl font-bold">顯示設定</h2>
          <button
            onClick={onClose}
            aria-label="關閉設定"
            className="text-gray-400 hover:text-white transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="space-y-6">
          {/* Font Size Control */}
          <div>
            <label htmlFor="fontSize" className="block text-lg mb-2">
              字體大小: <span className="font-semibold">{fontSize}px</span>
            </label>
            <input
              id="fontSize"
              type="range"
              min="50"
              max="250"
              step="1"
              value={fontSize}
              onChange={(e) => onFontSizeChange(parseInt(e.target.value, 10))}
              className="w-full h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer"
            />
          </div>

          {/* Font Color Control */}
          <div>
            <label className="block text-lg mb-3">字體顏色</label>
            <div className="flex items-center space-x-4">
              {PRESET_COLORS.map((color) => (
                <button
                  key={color}
                  onClick={() => onFontColorChange(color)}
                  aria-label={`設定顏色為 ${color}`}
                  className={`w-8 h-8 rounded-full transition-transform transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 ${
                    fontColor.toUpperCase() === color ? 'ring-2 ring-white' : ''
                  }`}
                  style={{ backgroundColor: color }}
                />
              ))}
              <div className="relative w-10 h-10">
                <input
                    type="color"
                    value={fontColor}
                    onChange={(e) => onFontColorChange(e.target.value)}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    aria-label="自訂顏色選擇器"
                />
                <div 
                    className="w-full h-full rounded-full border-2 border-dashed border-gray-400"
                    style={{ backgroundColor: fontColor }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

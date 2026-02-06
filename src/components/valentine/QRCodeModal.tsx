import { useState, useRef } from "react";
import { QRCodeSVG } from "qrcode.react";
import { X, Download, Share2, QrCode } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

interface QRCodeModalProps {
  url: string;
  partnerName: string;
}

const QRCodeModal = ({ url, partnerName }: QRCodeModalProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const qrRef = useRef<HTMLDivElement>(null);

  const downloadQR = () => {
    const svg = qrRef.current?.querySelector("svg");
    if (!svg) return;

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d")!;
    canvas.width = 400;
    canvas.height = 480;

    // Background
    const gradient = ctx.createLinearGradient(0, 0, 400, 480);
    gradient.addColorStop(0, "#4a0020");
    gradient.addColorStop(1, "#6b0030");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 400, 480);

    // Title
    ctx.fillStyle = "#fff";
    ctx.font = "bold 20px sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("Valentine's Day Surprise", 200, 40);
    ctx.font = "16px sans-serif";
    ctx.fillStyle = "#ffb3c6";
    ctx.fillText(`For ${partnerName} ❤️`, 200, 65);

    // QR Code
    const svgData = new XMLSerializer().serializeToString(svg);
    const img = new Image();
    img.onload = () => {
      ctx.drawImage(img, 50, 90, 300, 300);
      
      // Footer
      ctx.font = "14px sans-serif";
      ctx.fillStyle = "#ffb3c6";
      ctx.fillText("Scan to open your surprise!", 200, 420);
      ctx.font = "12px sans-serif";
      ctx.fillStyle = "rgba(255,179,198,0.5)";
      ctx.fillText("Made with ❤️ by RAJESHKANNA S", 200, 460);

      const link = document.createElement("a");
      link.download = `love-qr-${partnerName}.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
      toast({ title: "QR Code downloaded! ❤️" });
    };
    img.src = "data:image/svg+xml;base64," + btoa(svgData);
  };

  const shareQR = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Valentine's Day Surprise",
          text: `I made a special Valentine surprise for you! Scan the QR code ❤️`,
          url: url,
        });
      } catch {
        navigator.clipboard.writeText(url);
        toast({ title: "Link copied!" });
      }
    } else {
      navigator.clipboard.writeText(url);
      toast({ title: "Link copied!" });
    }
  };

  const handleClose = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsOpen(false);
  };

  if (!isOpen) {
    return (
      <Button
        onClick={() => setIsOpen(true)}
        size="sm"
        className="bg-purple-600 hover:bg-purple-500 text-white text-xs"
      >
        <QrCode className="w-4 h-4 mr-1" />
        QR Code
      </Button>
    );
  }

  return (
    <div 
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
      onClick={handleClose}
    >
      <div 
        className="bg-gradient-to-br from-rose-950 to-pink-950 border border-rose-500/30 rounded-2xl p-6 max-w-sm w-full relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={handleClose}
          className="absolute top-3 right-3 text-rose-300 hover:text-white z-[101] w-8 h-8 flex items-center justify-center rounded-full bg-black/30 hover:bg-black/50 transition-colors"
          type="button"
        >
          <X className="w-5 h-5" />
        </button>

        <h3 className="text-white font-semibold text-center mb-4">
          Share QR Code with {partnerName} 💕
        </h3>

        <div ref={qrRef} className="bg-white p-4 rounded-xl mx-auto w-fit">
          <QRCodeSVG
            value={url}
            size={200}
            level="H"
            fgColor="#4a0020"
            bgColor="#ffffff"
          />
        </div>

        <p className="text-rose-300/60 text-xs text-center mt-4 mb-4">
          Scan to open the love surprise!
        </p>

        <div className="flex gap-2">
          <Button
            onClick={downloadQR}
            className="flex-1 bg-rose-600 hover:bg-rose-500 text-white"
          >
            <Download className="w-4 h-4 mr-1" />
            Download
          </Button>
          <Button
            onClick={shareQR}
            className="flex-1 bg-pink-600 hover:bg-pink-500 text-white"
          >
            <Share2 className="w-4 h-4 mr-1" />
            Share
          </Button>
        </div>
      </div>
    </div>
  );
};

export default QRCodeModal;

import { Copy, Trash2 } from "lucide-react";
import type { Link } from "../types/link";

interface LinkCardProps {
  link: Link;
  onDelete: (id: string) => Promise<void>;
}

export function LinkCard({ link, onDelete }: LinkCardProps) {
  async function copyToClipboard() {
    await navigator.clipboard.writeText(link.shortUrl);
    alert("Link copiado!");
  }

  return (
    <article className="link-card">
      <div className="link-info">
        <strong className="short-url">{link.shortUrl}</strong>
        <p className="original-url">{link.originalUrl}</p>
        <span className="access-count">{link.accessCount} acessos</span>
      </div>

      <div className="link-actions">
        <button className="icon-button" onClick={copyToClipboard} title="Copiar link">
          <Copy size={18} />
        </button>

        <button
          className="icon-button danger"
          onClick={() => onDelete(link.id)}
          title="Remover link"
        >
          <Trash2 size={18} />
        </button>
      </div>
    </article>
  );
}
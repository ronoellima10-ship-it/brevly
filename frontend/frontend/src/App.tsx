import { useEffect, useState } from "react";
import { api } from "./services/api";
import type { Link } from "./types/link";
import { CreateLinkForm } from "./components/CreateLinkForm";
import { LinkCard } from "./components/LinkCard";

export default function App() {
  const [links, setLinks] = useState<Link[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  async function fetchLinks() {
    const response = await api.get<Link[]>("/links");
    setLinks(response.data);
  }

  async function handleCreateLink(originalUrl: string) {
    const response = await api.post<Link>("/links", {
      originalUrl,
    });

    setLinks((prevState) => [response.data, ...prevState]);
  }

  async function handleDeleteLink(id: string) {
    await api.delete(`/links/${id}`);

    setLinks((prevState) => prevState.filter((link) => link.id !== id));
  }

  useEffect(() => {
    fetchLinks().finally(() => {
      setIsLoading(false);
    });
  }, []);

  return (
    <main className="main-container">
      <div className="app-wrapper">
        <section className="card hero-card">
          <h1>Brev.ly</h1>
          <p>Encurte seus links e acompanhe seus acessos em tempo real.</p>

          <CreateLinkForm onCreateLink={handleCreateLink} />
        </section>

        <section className="card links-card">
          <h2>Meus links</h2>

          {isLoading && <p className="loading-state">Carregando links...</p>}

          {!isLoading && links.length === 0 && (
            <p className="empty-state">Nenhum link cadastrado ainda.</p>
          )}

          <div className="links-list">
            {links.map((link) => (
              <LinkCard key={link.id} link={link} onDelete={handleDeleteLink} />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
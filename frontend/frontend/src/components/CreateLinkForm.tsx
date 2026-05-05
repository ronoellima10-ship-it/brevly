import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const createLinkSchema = z.object({
  originalUrl: z.string().url("Informe uma URL válida"),
});

type CreateLinkFormData = z.infer<typeof createLinkSchema>;

interface CreateLinkFormProps {
  onCreateLink: (originalUrl: string) => Promise<void>;
}

export function CreateLinkForm({ onCreateLink }: CreateLinkFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CreateLinkFormData>({
    resolver: zodResolver(createLinkSchema),
  });

  async function handleCreateLink(data: CreateLinkFormData) {
    await onCreateLink(data.originalUrl);
    reset();
  }

  return (
    <form className="create-link-form" onSubmit={handleSubmit(handleCreateLink)}>
      <label htmlFor="originalUrl">Link original</label>

      <input
        id="originalUrl"
        type="url"
        placeholder="https://exemplo.com"
        {...register("originalUrl")}
      />

      {errors.originalUrl && (
        <span className="form-error">{errors.originalUrl.message}</span>
      )}

      <button className="primary-button" type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Criando..." : "Encurtar link"}
      </button>
    </form>
  );
}
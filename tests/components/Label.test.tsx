import { render, screen } from "@testing-library/react"
import Label from "../../src/components/Label"
import { LanguageProvider } from "../../src/providers/language/LanguageProvider"
import { Language } from '../../src/providers/language/type';

describe("Label", () => {
  const renderComponent = (labelId: string, language: Language) => {
    render(
      <LanguageProvider language={language}>
        <Label labelId={labelId} />
      </LanguageProvider>
    );
  };
  // Primer grupo de pruebas para el idioma inglés (EN).
  it.each([
    { labelId: "welcome", text: "Welcome" },
    { labelId: "new_product", text: "New Product" },
    { labelId: "edit_product", text: "Edit Product" },
  ])("should render $labelId with english $text", ({ labelId, text }) => {
    renderComponent(labelId, "en");

    expect(screen.getByText(text)).toBeInTheDocument();
  });

  // Primer grupo de pruebas para el idioma español (ES).
  it.each([
    { labelId: "welcome", text: "Bienvenidos" },
    { labelId: "new_product", text: "Nuevo Producto" },
    { labelId: "edit_product", text: "Editar Producto" },
  ])("should render $labelId with spanish $text", ({ labelId, text }) => {
    renderComponent(labelId, "es");

    expect(screen.getByText(text)).toBeInTheDocument();
  });

  // Prueba para verificar el comportamiento cuando se proporciona un identificador de etiqueta inválido.

  it("should throw for invalid labelId", () => {
    expect(() => renderComponent("#", "es")).toThrowError();
  });  
})
import { render, screen } from "@testing-library/react";
import ExpandableText from "../../src/components/ExpandableText";
import userEvent from "@testing-library/user-event";

describe("Expandable Text", () => {
  const limit = 255;
  const longText = "a".repeat(limit + 1);
  const truncatedText = longText.substring(0, limit) + "...";

  // Primer caso de prueba: verifica que se muestre el texto completo si tiene menos de 255 caracteres.

  it("should render the full text if less than 255 characters and there is no button", () => {
    const text = "Demo test";
    render(<ExpandableText text={text} />);
    expect(screen.getByText(text)).toBeInTheDocument();
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });

  // Segundo caso de prueba: verifica que el texto se trunque si es más largo de 255 caracteres.
  it("should truncate text when is longer than 255 char", () => {
    render(<ExpandableText text={longText} />);
    expect(screen.getByText(truncatedText)).toBeInTheDocument();
    const button = screen.getByRole("button");
    expect(button).toHaveTextContent(/more/i);
    expect(button).toBeInTheDocument();
  });
  // Tercer caso de prueba: verifica que el texto se expanda al hacer clic en el botón "Show More".

  it("text should be expanded on 'Show more' button click", async () => {
    render(<ExpandableText text={longText} />);
    const button = screen.getByRole("button");

    const user = userEvent.setup();
    await user.click(button);

    expect(screen.getByText(longText)).toBeInTheDocument();

    expect(screen.getByText(/less/i)).toBeInTheDocument();
  });

  // Cuarto caso de prueba: verifica que el texto se colapse al hacer clic en el botón "Show Less".
  
  it("should collapse text when Show Less button is clicked", async () => {
    render(<ExpandableText text={longText} />);
    const showMoreButton = screen.getByRole("button", { name: /more/i });
    const user = userEvent.setup();
    await user.click(showMoreButton);

    const showLessButton = screen.getByRole("button", { name: /less/i });
    await user.click(showLessButton);

    expect(screen.getByText(truncatedText)).toBeInTheDocument();
    expect(showLessButton).toHaveTextContent(/more/i);
  });
});

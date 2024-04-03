import { render, screen } from "@testing-library/react";
import SearchBox from "../../src/components/SearchBox";
import userEvent from "@testing-library/user-event";

describe("SearchBox", () => {
  const renderComponent = () => {
    const onChange = vi.fn();

    render(<SearchBox onChange={onChange} />);

    return {
      input: screen.getByPlaceholderText(/search/i),
      user: userEvent.setup(),
      onChange,
    };
  };

  // Primer caso de prueba: verifica que se renderice un campo de entrada para buscar.
  it("should render a search input on screen", () => {
    const { input } = renderComponent();
    expect(input).toBeInTheDocument();
    screen.debug();
  });

  // Segundo caso de prueba: verifica que la función onChange sea llamada cuando se presiona Enter.
  it("should call onChange when Enter is pressed", async () => {
    const { input, user, onChange } = renderComponent();

    const searchTeam = "Algo";

    await user.type(input, searchTeam + "{enter}");

    expect(onChange).toHaveBeenCalledWith(searchTeam);
  });

  // Tercer caso de prueba: verifica que onChange no sea llamada si el campo de entrada está vacío.
  it("should not call onChange when input field is empty", async () => {
    const { input, user, onChange } = renderComponent();

    await user.type(input, "{enter}");

    expect(onChange).not.toHaveBeenCalled();
  });
});

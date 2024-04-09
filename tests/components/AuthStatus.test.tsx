import { render, screen } from "@testing-library/react";
import AuthStatus from "../../src/components/AuthStatus";
import AllProviders from "../AllProviders";
import { mockAuthState } from "../mock/utils";

describe("AuthStatus", () => {

  const renderComponent = () => {
    render(<AuthStatus />, { wrapper: AllProviders});
  };

  // Primera prueba: Verifica que se muestre un mensaje de carga.
  it("should render a loading message while fetch the auth status" , () => {
    mockAuthState({
      isLoading: true,
      isAuthenticated: false,
      user: undefined,
    });

    renderComponent();

    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  // Segunda prueba: Verifica que se muestre el botón de inicio de sesión si el usuario no está autenticado.
  it("should render login button if user is not authenticated", () => {
    mockAuthState({
      isLoading: false,
      isAuthenticated: false,
      user: undefined,
    });

    renderComponent();

    expect(
      screen.getByRole("button", { name: /log in/i })
    ).toBeInTheDocument();
  });

  // Tercera prueba: Verifica que se muestre el nombre del usuario si está autenticado.
  it("should render the user name if authenticated", () => {
    mockAuthState({
      isLoading: false,
      isAuthenticated: true,
      user: { name: "Paco" },
    });

    renderComponent();

    expect(screen.getByText("Paco")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /log out/i })
    ).toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: /log in/i })
    ).not.toBeInTheDocument();
  });
});
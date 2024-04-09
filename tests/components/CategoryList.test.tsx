import { render, screen, waitForElementToBeRemoved } from "@testing-library/react";
import CategoryList from "../../src/components/CategoryList";
import AllProviders from "../AllProviders";
import { db } from "../mock/db";
import { Category } from "../../src/entities";
import { simulateDelay, simulateError } from "../mock/utils";


describe("CategoryList", () => {
  const categories: Category[] = [];

  beforeAll(() => {
    [1, 2, 3].forEach((item) => {
      const category = db.category.create({
        name: "Category " + item,
      });
      categories.push(category);
    });
  });

  afterAll(() => {
    const categoryIds = categories.map((i) => i.id);
    db.category.deleteMany({ where: { id: { in: categoryIds } } });
  });

  const renderComponent = () => {
    render(<CategoryList />, { wrapper: AllProviders });
  };

  it("should render a list of categories", async () => {
    renderComponent();

    await waitForElementToBeRemoved(() => screen.getByText(/loading/i));

    categories.forEach((category) => {
      expect(screen.getByText(category.name)).toBeInTheDocument();
    });
  });

  // Prueba que verifica la aparición del mensaje de carga durante la obtención de las categorías.
  it("should render loading message", () => {
    simulateDelay("/categories");
    renderComponent();

    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  // Prueba que verifica la aparición de un mensaje de error si la carga de las categorías falla.
  it("should render error message where there is an error", async () => {
    simulateError("/categories")
    renderComponent();
    const message = await screen.findByText(/error/i);
    expect(message).toBeInTheDocument();
    screen.debug();
  });
});
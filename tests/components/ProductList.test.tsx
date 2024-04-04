import { render, screen } from "@testing-library/react";
import ProductList from "../../src/components/ProductList";
import { db } from "../mock/db";
import { AllProviders } from "../AllProviders";

describe("ProductList", () => {
  const productIds: number[] = [];

  beforeAll(() => {
    [1, 2, 3].forEach(() => {
      const product = db.product.create();
      productIds.push(product.id);
    });
  });

  afterAll(() => {
    db.product.deleteMany({ where: { id: { in: productIds } } });
  });

  it("should render a list of products", async () => {
    render(<ProductList />, { wrapper: AllProviders });

    const items = await screen.findAllByRole("listitem");

    expect(items.length).toBeGreaterThan(0);
  });

});
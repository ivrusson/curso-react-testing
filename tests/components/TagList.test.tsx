import { render, screen, waitFor } from "@testing-library/react";
import TagList from "../../src/components/TagList";

describe("TagList", () => {
  // Define un caso de prueba para verificar que se renderizan etiquetas
  
  it("should render a tag list", async () => {
    render(<TagList/>);

    // hay que esperar a que el componente renderize los tags
    // el waitFor no es optimo debido a que tiene un timeout de 100ms
    await waitFor(() => {
      const listItems = screen.getAllByRole("listitem");
      expect(listItems.length).toBeGreaterThan(0);
    });

    // const listItems = await screen.findAllByRole("listitem");
    // expect(listItems.length).toBeGreaterThan(0);

  });
});

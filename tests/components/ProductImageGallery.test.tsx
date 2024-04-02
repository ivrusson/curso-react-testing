import { render, screen } from "@testing-library/react";
import ProductImageGallery from "../../src/components/ProductImageGallery";


describe("ProductImageGallery", () => {
  // Devuelve un compoenente vacio
  it("should render nothing if images is an empty array", () => {
    const { container } = render(<ProductImageGallery imageUrls={[]} />);
    
    expect(container).toBeEmptyDOMElement();
  });

  // Devuelve un listado de imagenes
  it("should render a list of images", () => {
    const imageUrls: string[] = ['1', '2', '3'];

    render(<ProductImageGallery imageUrls={imageUrls} />);

    const images = screen.getAllByRole('img');
    expect(images).toHaveLength(3);
    imageUrls.forEach((src, index) => {
      expect(images[index]).toHaveAttribute('src', src);
    })

    screen.debug();    
  });

});
import { render, screen } from "@testing-library/react";
import ToastDemo from "../../src/components/ToastDemo";
import userEvent from "@testing-library/user-event";
import { Toaster } from "react-hot-toast";
describe("ToastDemo", () => {
  // Define un caso de prueba para verificar que se muestre un toast.
 it("should render a toast", async () =>{
    render( <>
      <ToastDemo />
      <Toaster />
    </>);

    /**
     * getBy cuando estás seguro de que tiene que estar renderizado
     * queryBy cuando no se sabe si está en el documento o son varios
     * findBy asincrono
     */

    const button = screen.getByRole("button");
    
    const user = userEvent.setup();
    await user.click(button);

    const toast = await screen.findByText(/success/i);
    expect(toast).toBeInTheDocument();
  })
})

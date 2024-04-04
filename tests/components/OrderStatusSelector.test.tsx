import { render, screen } from "@testing-library/react";
import OrderStatusSelector from "../../src/components/OrderStatusSelector";
import { Theme } from "@radix-ui/themes";
import userEvent from "@testing-library/user-event";

describe('OrderStatusSelector', () => {

  const renderComponent = () => {
    const onChange = vi.fn();
    render(<Theme>
      <OrderStatusSelector onChange={onChange} />
    </Theme>)

    return {
      combobox: screen.getByRole("combobox"),
      getOptions: () => screen.findAllByRole('option'),
      getOption: (name: RegExp) => screen.findByRole("option", { name }),
      onChange,
      user: userEvent.setup(),
    };
  }
  // Primer caso de prueba: verifica que el valor predeterminado sea "New".
  it("should render new as the default value", () => {
    const { combobox }  = renderComponent();

    expect(combobox).toHaveTextContent(/new/i);
  });

  // Segundo caso de prueba: verifica que se rendericen los estados correctos en el combobox.
  it("should render states into combobox", async() => {
    const { combobox, user, getOptions } = renderComponent();
    
    await user.click(combobox);
    const options = await getOptions();
    expect(options.length).toBe(3);

    // Opción dificil
    const labels = options.map((option) => option.textContent);
    expect(labels).toEqual(["New", "Processed", "Fulfilled"]);

    // Opcion fácil
    //const optionItems = ["New", "Processed", "Fulfilled"];
    // options.forEach((option, i) => {
    //   expect(option).toHaveTextContent(optionItems[i])
    // });
  });

  // Tercer y cuarto caso de prueba: verifican que se llame a onChange con el valor correcto cuando se selecciona una opción.
  it.each([
    { name: /processed/i, value: "processed" },
    { name: /fulfilled/i, value: "fulfilled" },
  ])(
    "Should call onChange with $value when option $name is selected",
    async ({ name, value }) => {
      const { combobox, user, getOption, onChange } = renderComponent();

      await user.click(combobox);

      // Se desplega el combobox

      //Seleccionar fullfilled
      const selectedOption = await getOption(name);
      await user.click(selectedOption);

      // Comprobar wue fullfilled ha sido seleccionado
      expect(onChange).toHaveBeenCalledWith(value);
    }
  );

  // Quinto caso de prueba: similar a los anteriores, pero verificando la selección de la opción "New".
  it("should call onChange with 'new' when the New option is selected", async () => {
      const { combobox, user, getOption, onChange } = renderComponent();

      await user.click(combobox);
      const processedOption = await getOption(/processed/i);
      await user.click(processedOption);
      await user.click(combobox);

      const newOption = await getOption(/new/i);
      await user.click(newOption);

      expect(onChange).toHaveBeenCalledWith("new");
  });
});
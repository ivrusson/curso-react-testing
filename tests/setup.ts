 import "@testing-library/jest-dom/vitest";
import ResizeObserver from "resize-observer-polyfill";
import { server } from "./mock/server";

// Levanta el servidor de mock antes de empezar los test
beforeAll(() => server.listen());
// Limpiar los datos despues de cada test para evitar incongruencias
afterEach(() => server.resetHandlers());
// Cerrar el servidor despues de pasar los test
afterAll(() => server.close());


Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(), // deprecated
    removeListener: vi.fn(), // deprecated
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

global.ResizeObserver = ResizeObserver;

window.HTMLElement.prototype.scrollIntoView = vi.fn();
window.HTMLElement.prototype.hasPointerCapture = vi.fn();
window.HTMLElement.prototype.releasePointerCapture = vi.fn();
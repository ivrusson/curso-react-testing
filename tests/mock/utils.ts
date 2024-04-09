import { delay, http, HttpResponse } from "msw";
import { server } from "./server";
import { useAuth0, User } from "@auth0/auth0-react";


export const simulateDelay = (endpoint: string) => {
  server.use(http.get(endpoint, async () => {
    await delay();
    return HttpResponse.json([]);
  }));
};

export const simulateError = (endpoint: string) => {
  server.use(http.get(endpoint, () => HttpResponse.error()));
};

type AuthState = {
  user: User | undefined;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export const mockAuthState = (authState: AuthState) => {
  vi.mocked(useAuth0).mockReturnValue({
    ...authState,
    getAccessTokenSilently: vi.fn().mockResolvedValue('a'),
    getAccessTokenWithPopup: vi.fn(),
    getIdTokenClaims: vi.fn(),
    loginWithPopup: vi.fn(),
    loginWithRedirect: vi.fn(),
    logout: vi.fn(),
    handleRedirectCallback: vi.fn(),
  });
};
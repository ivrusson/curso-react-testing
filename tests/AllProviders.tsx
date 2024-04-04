import { Theme } from "@radix-ui/themes"
import { PropsWithChildren } from "react"

export const AllProviders = ({children}: PropsWithChildren) => {
  return <Theme>{children}</Theme>;
};
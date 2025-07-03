import * as React from "react"

// import { cn } from "@/lib/utils"

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      {...props}
    />
  )
}

export { Textarea }

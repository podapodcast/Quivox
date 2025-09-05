import { Decimal } from "@prisma/client/runtime/library"

// Ensure Decimal serializes properly across the app
Object.defineProperty(Decimal.prototype, "toJSON", {
  value() {
    return this.toNumber() // or this.toString()
  },
})
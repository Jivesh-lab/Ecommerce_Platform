import repeat from "@lib/util/repeat"
import { HttpTypes } from "@medusajs/types"
import Item from "@modules/cart/components/item"

type ItemsTemplateProps = {
  cart?: HttpTypes.StoreCart
}

const ItemsTemplate = ({ cart }: ItemsTemplateProps) => {
  const items = cart?.items
  const gridClassName =
    items && items.length >= 3
      ? "grid-cols-1 gap-y-8 xsmall:grid-cols-2 small:grid-cols-3 xsmall:gap-x-[1px] xsmall:gap-y-0"
      : "grid-cols-1 gap-y-8 xsmall:grid-cols-2 xsmall:gap-x-[1px] xsmall:gap-y-0"

  return (
    <div className="w-full">
      <div className={`grid ${gridClassName}`}>
        {items
          ? items
              .sort((a, b) => {
                return (a.created_at ?? "") > (b.created_at ?? "") ? -1 : 1
              })
              .map((item) => {
                return (
                  <Item
                    key={item.id}
                    item={item}
                    type="full"
                    currencyCode={cart?.currency_code}
                  />
                )
              })
          : repeat(4).map((i) => {
              return (
                <div 
                  key={i} 
                  className="w-full aspect-[35/49] bg-neutral-100 animate-pulse border border-neutral-200"
                />
              )
            })}
      </div>
    </div>
  )
}

export default ItemsTemplate

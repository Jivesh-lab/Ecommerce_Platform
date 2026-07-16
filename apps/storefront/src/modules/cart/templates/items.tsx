import repeat from "@lib/util/repeat"
import { HttpTypes } from "@medusajs/types"
import Item from "@modules/cart/components/item"

type ItemsTemplateProps = {
  cart?: HttpTypes.StoreCart
}

const ItemsTemplate = ({ cart }: ItemsTemplateProps) => {
  const items = cart?.items

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 xsmall:grid-cols-2 gap-x-0 gap-y-8">
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
                  className="w-full aspect-[3/4] bg-neutral-100 animate-pulse border border-neutral-200"
                />
              )
            })}
      </div>
    </div>
  )
}

export default ItemsTemplate

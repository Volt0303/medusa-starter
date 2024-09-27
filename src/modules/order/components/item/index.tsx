import { HttpTypes, StoreProductVariant } from '@medusajs/types'
import { Table, Text } from '@medusajs/ui'
import LineItemOptions from '@modules/common/components/line-item-options'
import LineItemPrice from '@modules/common/components/line-item-price'
import LineItemUnitPrice from '@modules/common/components/line-item-unit-price'
import Thumbnail from '@modules/products/components/thumbnail'

type ItemProps = {
  item: HttpTypes.StoreCartLineItem | HttpTypes.StoreOrderLineItem
}

const Item = ({ item }: ItemProps) => {
  return (
    <Table.Row className="w-full" data-testid="product-row">
      <Table.Cell className="w-24 p-4 !pl-0">
        <div className="flex w-16">
          <Thumbnail thumbnail={item.thumbnail} size="square" />
        </div>
      </Table.Cell>

      <Table.Cell className="text-left">
        <Text
          className="txt-medium-plus text-ui-fg-base"
          data-testid="product-name"
        >
          {item.title}
        </Text>
        <LineItemOptions
          variant={item.variant as StoreProductVariant | undefined}
          data-testid="product-variant"
        />
      </Table.Cell>

      <Table.Cell className="!pr-0">
        <span className="flex h-full flex-col items-end justify-center !pr-0">
          <span className="flex gap-x-1">
            <Text className="text-ui-fg-muted">
              <span data-testid="product-quantity">{item.quantity}</span>x{' '}
            </Text>
            <LineItemUnitPrice item={item} style="tight" />
          </span>

          <LineItemPrice item={item} style="tight" />
        </span>
      </Table.Cell>
    </Table.Row>
  )
}

export default Item

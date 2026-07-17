// @ts-nocheck
import { useState, useEffect } from "react"
import { Drawer, Button, Input, Label, Switch, Select, toast } from "@medusajs/ui"
import { sdk } from "../../../../../lib/config"

type Section = {
  id?: string
  page: string
  section_key: string
  layout_type: "hero_slider" | "hero_banner" | "split_banner" | "editorial_banner" | "product_showcase" | "video_banner" | "newsletter" | "custom"
  display_order: number
  is_visible: boolean
  max_items: number | null
}

type Props = {
  open: boolean
  onOpenChange: (open: boolean) => void
  section: Partial<Section> | null
  defaultPage?: string
  onSuccess: () => void
}

const LAYOUT_OPTIONS = [
  { value: "hero_banner", label: "Hero Banner" },
  { value: "hero_slider", label: "Hero Slider" },
  { value: "split_banner", label: "Split Banner" },
  { value: "editorial_banner", label: "Editorial Banner" },
  { value: "product_showcase", label: "Product Showcase" },
  { value: "video_banner", label: "Video Banner" },
  { value: "newsletter", label: "Newsletter" },
  { value: "custom", label: "Custom" }
]

export function SectionForm({ open, onOpenChange, section, defaultPage, onSuccess }: Props) {
  const isEdit = !!section?.id
  const [loading, setLoading] = useState(false)

  // Form State
  const [page, setPage] = useState(section?.page || defaultPage || "home")
  const [sectionKey, setSectionKey] = useState(section?.section_key || "")
  const [layoutType, setLayoutType] = useState(section?.layout_type || "custom")
  const [displayOrder, setDisplayOrder] = useState(section?.display_order?.toString() || "0")
  const [maxItems, setMaxItems] = useState(section?.max_items?.toString() || "")
  const [isVisible, setIsVisible] = useState(section?.is_visible ?? true)

  useEffect(() => {
    if (open) {
      setPage(section?.page || defaultPage || "home")
      setSectionKey(section?.section_key || "")
      setLayoutType(section?.layout_type || "custom")
      setDisplayOrder(section?.display_order?.toString() || "0")
      setMaxItems(section?.max_items?.toString() || "")
      setIsVisible(section?.is_visible ?? true)
    }
  }, [section, defaultPage, open])
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      const payload = {
        page,
        section_key: sectionKey,
        layout_type: layoutType,
        display_order: parseInt(displayOrder, 10),
        max_items: maxItems ? parseInt(maxItems, 10) : null,
        is_visible: isVisible,
      }

      if (isEdit) {
        await sdk.client.fetch(`/admin/content/landing-pages/${section!.id}`, {
          method: "PUT",
          body: payload
        })
        toast.success("Section updated successfully")
      } else {
        await sdk.client.fetch(`/admin/content/landing-pages`, {
          method: "POST",
          body: payload
        })
        toast.success("Section created successfully")
      }

      onSuccess()
      onOpenChange(false)
    } catch (error: any) {
      toast.error(error.message || "An error occurred")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <Drawer.Content className="max-w-2xl">
        <Drawer.Header>
          <Drawer.Title>{isEdit ? "Edit Section" : "Add Section"}</Drawer.Title>
        </Drawer.Header>
        <form onSubmit={handleSubmit} className="flex flex-col h-full overflow-hidden">
          <Drawer.Body className="flex-1 overflow-y-auto flex flex-col gap-6 p-6">

            <div className="flex flex-col gap-4">
              <div className="flex gap-4">
                <div className="flex-1 flex flex-col gap-2">
                  <Label>Page *</Label>
                  <Select value={page} onValueChange={setPage}>
                    <Select.Trigger><Select.Value /></Select.Trigger>
                    <Select.Content className="z-[999]">
                      <Select.Item value="home">Home</Select.Item>
                      <Select.Item value="men">Men</Select.Item>
                      <Select.Item value="women">Women</Select.Item>
                      <Select.Item value="kids">Kids</Select.Item>
                      <Select.Item value="teen">Teen</Select.Item>
                    </Select.Content>
                  </Select>
                </div>
                <div className="flex-1 flex flex-col gap-2">
                  <Label>Section Key *</Label>
                  <Input value={sectionKey} onChange={(e) => setSectionKey(e.target.value)} required placeholder="e.g. hero" />
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-1 flex flex-col gap-2">
                  <Label>Layout Type *</Label>
                  <Select value={layoutType} onValueChange={(val: any) => setLayoutType(val)}>
                    <Select.Trigger><Select.Value /></Select.Trigger>
                    <Select.Content className="z-[999]">
                      {LAYOUT_OPTIONS.map((option) => (
                        <Select.Item key={option.value} value={option.value}>
                          {option.label}
                        </Select.Item>
                      ))}
                    </Select.Content>
                  </Select>
                </div>
                <div className="flex-1 flex flex-col gap-2">
                  <Label>Max Items (Optional)</Label>
                  <Input type="number" value={maxItems} onChange={(e) => setMaxItems(e.target.value)} placeholder="Leave blank for unlimited" />
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-1 flex flex-col gap-2">
                  <Label>Display Order *</Label>
                  <Input type="number" value={displayOrder} onChange={(e) => setDisplayOrder(e.target.value)} required />
                </div>
                <div className="flex-1 flex flex-col gap-2 items-start justify-center">
                  <div className="flex items-center gap-2 mt-4">
                    <Switch checked={isVisible} onCheckedChange={setIsVisible} />
                    <Label>Visible</Label>
                  </div>
                </div>
              </div>
            </div>

          </Drawer.Body>
          <Drawer.Footer>
            <div className="flex justify-end gap-2">
              <Button variant="secondary" onClick={() => onOpenChange(false)} type="button">Cancel</Button>
              <Button type="submit" isLoading={loading}>{isEdit ? "Save" : "Add Section"}</Button>
            </div>
          </Drawer.Footer>
        </form>
      </Drawer.Content>
    </Drawer>
  )
}

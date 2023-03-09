export enum SettingsTab {
  MAKES = "makes",
  MODELS = "models",
  GENERATIONS = "generations",
  TRANSMISSIONS = "transmissions",
  ENGINES = "engines",
  BODY_TYPES = "body-types",
  CATEGORIES = "categories",
  SUBCATEGORIES = "subcategories",
  GROUPS = "groups",
  CITIES = "cities",
  ADDRESSES = "addresses",
  MANUFACTURERS = "manufacturers"
}

export interface SettingsMenuItem {
  title: string,
  key: SettingsTab
}
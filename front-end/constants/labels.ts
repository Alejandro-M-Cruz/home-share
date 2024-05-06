const statusLabels = {
  all: 'All',
  active: 'Published',
  inactive: 'Private'
}

const typeLabels = {
  apartment: 'Apartment',
  house: 'House',
  apartment_block: 'Apartment block'
}

const sizeUnitLabels: Record<'sq_ft' | 'sq_m', string> = {
  sq_ft: 'ft²',
  sq_m: 'm²'
}

const sortByLabels = {
  created_at: 'Creation date',
  updated_at: 'Recently updated',
  monthly_rent: 'Monthly rent',
  available_rooms: 'Available rooms',
  size: 'Size',
  year_built: 'Year built'
}

const sortDirectionLabels = {
  asc: 'Ascending',
  desc: 'Descending'
}

export {
  statusLabels,
  typeLabels,
  sizeUnitLabels,
  sortByLabels,
  sortDirectionLabels
}

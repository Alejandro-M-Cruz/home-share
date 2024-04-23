import { Controller, useForm } from 'react-hook-form'
import {
  GetRentalListingsParams,
  RentalListingSortBy
} from '@/types/rental-listing'
import { ReactNode, useMemo } from 'react'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/Dialog'
import { Button } from '@/components/Button'
import { Text } from '@/components/Text'
import { View } from 'react-native'
import { Label } from '@/components/Label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/Select'
import { Input } from '@/components/Input'

type RentalListingParamDialogProps = {
  initialParams?: GetRentalListingsParams
  onSubmit?: (params: GetRentalListingsParams) => void
  onReset?: () => void
  closeOnReset?: boolean
  children: ReactNode
}

export const RentalListingParamDialog = ({
  initialParams,
  onSubmit,
  onReset,
  closeOnReset = true,
  children
}: RentalListingParamDialogProps) => {
  const defaultValues = useMemo(() => ({
    sortBy: initialParams?.sortBy,
    sortDirection: initialParams?.sortDirection,
    filters: {
      minMonthlyRent: initialParams?.filters?.minMonthlyRent?.toString() ?? '',
      maxMonthlyRent: initialParams?.filters?.maxMonthlyRent?.toString() ?? '',
      minAvailableRooms: initialParams?.filters?.minAvailableRooms?.toString() ?? '',
      maxAvailableRooms: initialParams?.filters?.maxAvailableRooms?.toString() ?? '',
      country: initialParams?.filters?.country ?? '',
      city: initialParams?.filters?.city ?? ''
    }
  }), [initialParams])

  const { control, reset, handleSubmit } = useForm({
    defaultValues
  })

  const sortByLabels: Record<RentalListingSortBy, string> = useMemo(
    () => ({
      created_at: 'Creation date',
      updated_at: 'Recently updated',
      monthly_rent: 'Monthly rent',
      available_rooms: 'Available rooms',
      size: 'Size',
      year_built: 'Year built'
    }),
    []
  )

  const sortDirectionLabels: Record<'asc' | 'desc', string> = useMemo(
    () => ({
      asc: 'Ascending',
      desc: 'Descending'
    }),
    []
  )

  const submit = ({
    sortBy,
    sortDirection,
    filters: {
      minMonthlyRent,
      maxMonthlyRent,
      minAvailableRooms,
      maxAvailableRooms,
      country,
      city
    }
  }: any) => {
    onSubmit?.({
      sortBy,
      sortDirection,
      filters: {
        minMonthlyRent: minMonthlyRent ? parseFloat(minMonthlyRent) : undefined,
        maxMonthlyRent: maxMonthlyRent ? parseFloat(maxMonthlyRent) : undefined,
        minAvailableRooms: minAvailableRooms
          ? parseInt(minAvailableRooms)
          : undefined,
        maxAvailableRooms: maxAvailableRooms
          ? parseInt(maxAvailableRooms)
          : undefined,
        country,
        city
      }
    })
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="text-center">Filters and sorting</DialogTitle>
        </DialogHeader>

        <View className="flex flex-col space-y-6 sm:px-4 mt-5">
          <View className="flex flex-row items-center justify-center space-x-4">
            <Label nativeID="sortBy">Sort by</Label>

            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <Select
                  nativeID="sortBy"
                  value={{
                    value: value ?? '',
                    label: value ? sortByLabels[value] : ''
                  }}
                  onOpenChange={isOpen => !isOpen && onBlur()}
                  onValueChange={option => onChange(option?.value)}
                >
                  <SelectTrigger>
                    <SelectValue
                      className="text-foreground text-sm native:text-lg"
                      placeholder="Sort by"
                    />
                  </SelectTrigger>
                  <SelectContent className="z-50" withPortal={false}>
                    {Object.entries(sortByLabels).map(([value, label]) => (
                      <SelectItem value={value} label={label} key={value}>
                        {label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
              name="sortBy"
            />

            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <Select
                  nativeID="sortDirection"
                  value={{
                    value: value as string,
                    label: sortDirectionLabels[value as 'asc' | 'desc']
                  }}
                  onOpenChange={isOpen => !isOpen && onBlur()}
                  onValueChange={option => onChange(option?.value)}
                >
                  <SelectTrigger>
                    <SelectValue
                      className="text-foreground text-sm native:text-lg"
                      placeholder="Sort direction"
                    />
                  </SelectTrigger>
                  <SelectContent className="z-50" withPortal={false}>
                    {Object.entries(sortDirectionLabels).map(
                      ([value, label]) => (
                        <SelectItem value={value} label={label} key={value}>
                          {label}
                        </SelectItem>
                      )
                    )}
                  </SelectContent>
                </Select>
              )}
              name="sortDirection"
            />
          </View>

          <View className="-z-10 flex flex-col space-y-6">
            <View className="flex flex-row items-center justify-center">
              <Label nativeID="maxMonthlyRent" className="w-full text-end me-3">
                Monthly rent
              </Label>
              <Text className="pe-0 me-1 text-end">$</Text>
              <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                    nativeID="minMonthlyRent"
                    className="ms-0 me-3"
                    inputMode="numeric"
                    placeholder="0.00"
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                  />
                )}
                name="filters.minMonthlyRent"
              />

              <Text className="me-3 font-extrabold">-</Text>
              <Text className="me-1 text-end">$</Text>
              <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                    nativeID="maxMonthlyRent"
                    inputMode="numeric"
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                  />
                )}
                name="filters.maxMonthlyRent"
              />
            </View>

            <View className="flex flex-row items-center justify-center space-x-3">
              <Label nativeID="minAvailableRooms" className="w-full text-end">
                Available rooms
              </Label>
              <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                    nativeID="minAvailableRooms"
                    inputMode="numeric"
                    value={value}
                    onChangeText={text =>
                      onChange(text ? parseInt(text) : undefined)
                    }
                    onBlur={onBlur}
                  />
                )}
                name="filters.minAvailableRooms"
              />

              <Text className="font-extrabold">-</Text>
              <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                    nativeID="maxAvailableRooms"
                    inputMode="numeric"
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                  />
                )}
                name="filters.maxAvailableRooms"
              />
            </View>

            <View className="flex flex-row items-center space-x-3">
              <Label nativeID="country" className="text-end flex-grow">
                Country
              </Label>

              <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                    className="max-w-[400px]"
                    nativeID="country"
                    inputMode="text"
                    onChangeText={onChange}
                    value={value}
                    onBlur={onBlur}
                  />
                )}
                name="filters.country"
              />
            </View>

            <View className="flex flex-row items-center space-x-3">
              <Label nativeID="city" className="text-end flex-grow">
                City
              </Label>

              <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                    className="max-w-[400px]"
                    nativeID="city"
                    inputMode="text"
                    onChangeText={onChange}
                    value={value}
                    onBlur={onBlur}
                  />
                )}
                name="filters.city"
              />
            </View>

            <View className="flex flex-row gap-6 justify-center">
              {closeOnReset ? (
                <DialogClose asChild>
                  <Button
                    variant="outline"
                    onPress={() => {
                      reset(defaultValues)
                      onReset?.()
                    }}
                  >
                    <Text>Reset</Text>
                  </Button>
                </DialogClose>
              ) : (
                <Button
                  variant="outline"
                  onPress={() => {
                    reset(defaultValues)
                    onReset?.()
                  }}
                >
                  <Text>Reset</Text>
                </Button>
              )}

              <DialogClose asChild>
                <Button onPress={handleSubmit(submit)}>
                  <Text>Apply</Text>
                </Button>
              </DialogClose>
            </View>
          </View>
        </View>
      </DialogContent>
    </Dialog>
  )
}

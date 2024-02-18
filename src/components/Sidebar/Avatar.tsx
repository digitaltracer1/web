// components/Avatar.tsx

import * as React from 'react'

interface IUser {
  name: string
  firstName: string
  lastName: string
  email: string
}

function map(
  value: number,
  start1: number,
  stop1: number,
  start2: number,
  stop2: number,
) {
  return ((value - start1) / (stop1 - start1)) * (stop2 - start2) + start2
}

const getByteLength = (string: string): number => {
  return new TextEncoder().encode(string[0])[0]
}

const minCharByteValue: number = getByteLength('a')
const maxCharByteValue: number = getByteLength('z')

const minRange: number = minCharByteValue / maxCharByteValue
const maxRange: number = 1

const initials = (firstname: string, lastname: string) =>
  (firstname[0] + lastname[0]).toUpperCase()

const colorByUser = ({ firstName, lastName }: IUser): string => {
  const userValue =
    getByteLength(firstName[0].toLowerCase()) /
    getByteLength(lastName[0].toLowerCase())

  return `hsl(${map(userValue, minRange, maxRange, 0, 360)},50%,50%)`
}

export const Avatar: React.FC<{ user: { name: string; email: string } }> = ({
  user: { name, email },
}) => {
  const nameParts = name.split(' ')

  const firstName = nameParts[0]
  const lastName = nameParts[nameParts.length - 1]

  return (
    <div
      className="text-white w-10 h-10 flex items-center justify-center font-bold text-2x rounded-full bg-gray-500"
      style={{
        backgroundColor: colorByUser({ name, firstName, lastName, email }),
      }}
    >
      {initials(firstName, lastName)}
    </div>
  )
}

import Link from 'next/link'
import { Avatar } from './Sidebar/Avatar'

interface User {
  sellerId: string
  sellerName: string
  birthdate: string
  rule: string
  store: string
  nickname: string
}

interface UserListItemProps {
  user: User
}

function capitalizeFirstLetter(str: string) {
  return str.replace(/\b\w/g, (char) => char.toUpperCase())
}

const UserListItem: React.FC<UserListItemProps> = ({ user }) => {
  const { sellerId, sellerName, birthdate, rule } = user

  return (
    <Link href={`/sellers/${sellerId}`} passHref>
      <div className="flex items-center p-4 border-b cursor-pointer dark:border-zinc-700 dark:bg-zinc-800 dark:hover:border-orange-300 dark:hover:ring-orange-500/20 hover:border-orange-300 hover:ring-4 hover:ring-orange-100 border border-zinc-300 shadow-sm rounded-lg">
        <Avatar
          user={{
            name: sellerName,
            email: `${sellerName}@${sellerId}`,
          }}
        />
        <div className="ml-4">
          <div className="font-medium">
            {capitalizeFirstLetter(sellerName.toLowerCase())}
          </div>
          <div className="text-sm text-gray-600">{rule}</div>
          <div className="text-xs text-gray-500">{birthdate}</div>
        </div>
      </div>
    </Link>
  )
}

export default UserListItem

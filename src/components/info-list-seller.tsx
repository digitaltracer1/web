import Link from 'next/link'
import { Avatar } from './Sidebar/Avatar'

interface User {
  id: string
  name: string
  birthdate: string
}

interface UserListItemProps {
  user: User
}

const UserListItem: React.FC<UserListItemProps> = ({ user }) => {
  const { id, name, birthdate } = user

  return (
    <Link href={`/sellers/${id}`} passHref>
      <div className="flex items-center p-4 border-b cursor-pointer dark:border-zinc-700 dark:bg-zinc-800 dark:hover:border-orange-300 dark:hover:ring-orange-500/20 hover:border-orange-300 hover:ring-4 hover:ring-orange-100 border border-zinc-300 shadow-sm rounded-lg">
        <Avatar
          user={{
            name,
            email: `${name}@${id}`,
          }}
        />
        <div className="ml-4">
          <div className="font-medium">{name}</div>
          <div className="text-sm text-gray-600">Vendedor</div>
          <div className="text-xs text-gray-500">{birthdate}</div>
        </div>
      </div>
    </Link>
  )
}

export default UserListItem

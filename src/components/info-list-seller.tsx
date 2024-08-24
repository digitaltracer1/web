import Link from 'next/link'
import { Avatar } from './Sidebar/Avatar'
import { Button } from '@/components/Button' // Certifique-se de que esse caminho está correto
import { GoalIcon } from 'lucide-react'

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
  paramUrl: string
}

export function capitalizeFirstLetter(str: string) {
  return str.replace(/\b\w/g, (char) => char.toUpperCase())
}

const UserListItem: React.FC<UserListItemProps> = ({ user, paramUrl }) => {
  const { sellerId, sellerName, birthdate, rule } = user

  return (
    <div className="flex items-center justify-between p-4 border-b dark:border-zinc-700 dark:bg-zinc-800 dark:hover:border-orange-300 dark:hover:ring-orange-500/20 hover:border-orange-300 hover:ring-4 hover:ring-orange-100 border border-zinc-300 shadow-sm rounded-lg">
      <div className="w-full">
        <Link
          href={`/${paramUrl}/${sellerId}`}
          passHref
          className="flex items-center"
        >
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
            <div className="text-xs text-gray-500">
              {birthdate || <>&nbsp;</>}
            </div>
          </div>
        </Link>
      </div>
      <div>
        <Link href={`/goals/${sellerId}`} passHref>
          <Button variant="ghost" className="ml-4">
            <GoalIcon className="hover:text-orange-600" />
          </Button>
        </Link>
      </div>
    </div>
  )
}

export default UserListItem

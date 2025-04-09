"use client"
import { DropdownMenu, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { DropdownMenuItem } from '@/components/ui/dropdown-menu'
import { DropdownMenuContent } from '@/components/ui/dropdown-menu'
import React from 'react'
import { useAuth } from '@/contexts/AuthContext'
import Image from 'next/image'


const SidebarFooter = () => {
    const {user}= useAuth()
  return (
    <DropdownMenu>
    <DropdownMenuTrigger>
        <Image src={user?.image || ''} alt='avatar' width={32} height={32} className='rounded-full' />
    </DropdownMenuTrigger>
    <DropdownMenuContent>
      <DropdownMenuLabel>My Account</DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuItem>{user?.email}</DropdownMenuItem>
      <DropdownMenuItem>Logout</DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
  )
}

export default SidebarFooter

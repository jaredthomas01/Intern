'use client'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import React from 'react'
import { useSnackbar } from 'notistack';

const NavBar = () => {
	const { data: session } = useSession()
	const { enqueueSnackbar } = useSnackbar()

	if (!session) {
		enqueueSnackbar('Loading logged in session', { variant: 'success' })
		return (
			<div className="min-h-screen grid place-items-center w-full">
				<span className="loading loading-dots loading-lg"></span>
			</div>
		)
	}

	return (
		<nav className="bg-green-500 p-4 flex justify-between items-center text-white">
			<p className="text-2xl font-semibold">InternLink™</p>
			<div className="flex gap-2 items-center">
				<button className="text-white bg-green-700 btn ring-1 ring-gray-100 ring-offset-1 btn-circle btn-ghost btn-sm">
					<i className="fa-solid fa-bell-slash"></i>
				</button>
				<Link href="/profile">
					<button className="text-white bg-green-700 btn ring-1 ring-green-100 ring-offset-1 w-8 h-8 rounded-full btn-ghost btn-sm">
						<i className={'fa-solid fa-user'}></i>
					</button>
				</Link>
			</div>
		</nav>
	)
}

export default NavBar

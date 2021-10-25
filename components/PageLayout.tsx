import React, { ReactNode, useEffect } from 'react';
import SVG from './SVG';
import Link from 'next/link';
import { useRouter } from 'next/dist/client/router';

interface PageLayoutProps {
	children: ReactNode;
}
const PageLayout = (props: PageLayoutProps) => {
	const { children } = props;
	const router = useRouter();
	return (
		<div className='fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center z-20'>
			<Link href='/'>
				<div className='absolute top-0 left-0 right-0 bottom-0 z-10'></div>
			</Link>
			<div className='max-w-2xl w-full p-4 z-20'>
				<div
					className='border-2 border-blue rounded-lg relative bg-gray-100 overflow-y-auto overflow-x-hidden p-2'
					style={{ minHeight: 48, maxHeight: 'calc(var(--vh) * 100)' }}
				>
					<Link href='/'>
						<button className='absolute top-3 left-3'>
							<SVG name='close' classes='fill-current text-gray-800' />
						</button>
					</Link>
					{children}
				</div>
			</div>
		</div>
	);
};

export default PageLayout;

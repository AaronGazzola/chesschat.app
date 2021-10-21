import Head from 'next/head';

interface MetaProps {
	title: string;
	keywords: string;
	description: string;
}

const Meta = (props: MetaProps) => {
	const { keywords, description, title } = props;
	return (
		<Head>
			<meta name='keywords' content={keywords} />
			<meta name='description' content={description} />
			<meta property='og:title' content={title} />
			<meta property='og:description' content={description} />
			<meta
				property='og:image'
				content='https://chesschat.app/assets/images/og_image.png'
			/>
			<meta property='og:url' content='https://chesschat.app' />
			<meta property='og:site_name' content='Apex Apps' />
			<meta name='twitter:image:alt' content={title} />
			<title>{title}</title>
		</Head>
	);
};

Meta.defaultProps = {
	title: 'Chess Chat | Play chess and chat with friends!',
	keywords: 'chess chat app multiplayer online checkmate play players friends',
	description: 'Play chess and chat with friends online'
};

export default Meta;

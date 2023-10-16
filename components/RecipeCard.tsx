import Image from 'next/image'
import Link from 'next/link'
import DifficultyPill from '@/components/DifficultyPill'
import ServingInfo from '@/components/ServingInfo'

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription
} from "@/components/ui/card"

interface Props {
	id: string;
	title: string;
  description: string;
	image: string;
  views: number;
	preparation: number;
	difficulty: string;
	serving: {
    min: number;
    max: number;
  }
}

const ResourceCard = ({ id, title, description, image, views, preparation, difficulty, serving } : Props) => {
  return (
		<Card className="w-full max-w-fit border-2 bg-transparent hover:shadow-lg hover:scale-105 sm:max-w-[394px] transition-transform duration-300 ease-in-out">
			<CardHeader className="flex-center flex-col gap-2.5 !p-0">
				<div className="w-full h-[250px]">
					<Link href={`/recipe/${id}`}>
						<Image 
							src={image}
							className="h-full rounded-t-md object-cover"
							width={394}
							height={440}
							alt={title}
						/>
					</Link>
					<DifficultyPill className="absolute top-0 right-0 mt-2 mr-2" difficulty={difficulty} />
				</div>
				<div className="p-5">
					<CardTitle className="paragraph-semibold line-clamp-1 w-full text-left">{title}</CardTitle>
					<CardDescription className="line-clamp-3 my-3">{description}</CardDescription>
				</div>
			</CardHeader>
			<CardContent className="flex-between mt-4 p-5">

				<div className="flex-center align-middle body-medium gap-1">
					<Image 
						className="-mt-1"
						src="/timer-svgrepo-com.svg" width={20} height={20} alt="time"
					/> {preparation}Min
				</div>

				{serving && (
					<ServingInfo serving={serving} />
				)}

				<Link href={`/recipe/${id}`} className="text-white rounded-full 
				bg-orange hover:bg-orange-100 py-2 px-3">View Recipe</Link>
			</CardContent>
		</Card>
  )
}

export default ResourceCard
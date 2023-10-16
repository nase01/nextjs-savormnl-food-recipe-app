
import Image from 'next/image'

interface Props {
serving: {
    min: number;
    max: number;
  }
}

const ServingInfo = ({ serving } : Props) => {
    return (
			<div className="flex align-middle body-medium gap-1">
				<Image
					className="-mt-1"
					src="/user-svgrepo-com.svg"
					width={20}
					height={20}
					alt="user"
				/>
				{serving.min === serving.max ? (
					serving.max
				) : (
					<>
						{serving.min}-{serving.max}
					</>
				)}
				{serving.max >= 10 ? '+' : ''}
			</div>
    );
  }
  
  export default ServingInfo;
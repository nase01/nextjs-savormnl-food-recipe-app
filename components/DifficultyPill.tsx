const DifficultyPill = ({ difficulty, className }: any) => {
  let backgroundColorClass = '';
  
  switch (difficulty) {
    case 'easy':
      backgroundColorClass = 'bg-primary';
      break;
    case 'intermediate':
      backgroundColorClass = 'bg-pink';
      break;
    case 'advanced':
      backgroundColorClass = 'bg-purple';
      break;
    default:
      backgroundColorClass = 'bg-primary';
  }

  // Combine the provided class with the background color class
  const combinedClass = `px-4 rounded-full text-sm max-w-fit text-white ${backgroundColorClass} ${className}`;

  return (
    <div className={combinedClass}>
      {difficulty}
    </div>
  );
}

export default DifficultyPill;
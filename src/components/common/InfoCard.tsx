const InfoCard = ({
  title,
  value = 0,
}: {
  title: string;
  value?: string | number;
}) => {
  return (
    <div className='px-2 sm:px-4 md:px-6 py-2'>
      <p className='text-xs md:text-sm font-medium text-[#05060F99]'>{title}</p>
      <p className='font-bold text-xs sm:text-sm md:text-base'>{value}</p>
    </div>
  );
};

export default InfoCard;

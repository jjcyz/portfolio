'use client';

import { memo, useState } from 'react';
import Image from 'next/image';
import { getSkillIconUrl } from '@/lib/skillIcons';

interface SkillIconProps {
  skillName: string;
  size?: number;
}

/**
 * Skill icon component with error handling and fallback
 */
function SkillIcon({ skillName, size = 56 }: SkillIconProps) {
  const [imageError, setImageError] = useState(false);
  const iconUrl = getSkillIconUrl(skillName);

  if (imageError) {
    return (
      <div
        className="bg-slate-200 rounded-lg flex items-center justify-center text-slate-700 font-bold text-xs md:text-sm w-full h-full"
      >
        {skillName.charAt(0).toUpperCase()}
      </div>
    );
  }

  return (
    <Image
      src={iconUrl}
      alt={skillName}
      width={size}
      height={size}
      className="rounded-lg object-contain w-full h-full"
      style={{ filter: 'none' }}
      unoptimized
      onError={() => setImageError(true)}
    />
  );
}

export default memo(SkillIcon);


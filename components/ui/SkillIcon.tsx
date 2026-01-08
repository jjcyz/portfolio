'use client';

import { useState } from 'react';
import Image from 'next/image';
import { getSkillIconUrl } from '@/lib/skillIcons';

interface SkillIconProps {
  skillName: string;
  size?: number;
}

/**
 * Skill icon component with error handling and fallback
 */
export default function SkillIcon({ skillName, size = 56 }: SkillIconProps) {
  const [imageError, setImageError] = useState(false);
  const iconUrl = getSkillIconUrl(skillName);

  if (imageError) {
    return (
      <div
        className="bg-purple-500 rounded-lg flex items-center justify-center text-white font-bold text-sm"
        style={{ width: size, height: size }}
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
      className="rounded-lg object-cover"
      style={{ width: size, height: size }}
      unoptimized
      onError={() => setImageError(true)}
    />
  );
}


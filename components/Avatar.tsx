import useUser from "@/hooks/useUser";
import Image from "next/image";
import { useRouter } from "next/router";
import { useCallback } from "react";

interface AvatarProps {
  userId: string;
  isLarge?: boolean;
  hasBorder?: boolean;
}

const Avatar: React.FC<AvatarProps> = ({ userId, isLarge, hasBorder }) => {
  const router = useRouter();

  const { data: fetchedUser } = useUser(userId);

  const onClick = useCallback(
    (event: any) => {
      event.stopPropagation();

      const url = `/users/${userId}`;

      router.push(url);
    },
    [router, userId]
  );

  return (
    <div
      className={`rounded-full hover:opacity-90 transition cursor-pointer relative ${
        hasBorder && "border-4 border-black"
      } ${isLarge ? "h-32 w-32" : "h-12 w-12"}`}
    >
      <Image
        src={fetchedUser?.profileImage || "/images/placeholder.jpg"}
        alt="Avatar"
        fill
        style={{
          objectFit: "cover",
          borderRadius: "100%",
        }}
        onClick={onClick}
      />
    </div>
  );
};

export default Avatar;

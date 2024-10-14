import UserCard from "@/components/admin/UserCard";

export default function Page() {
  const userList = [
    {
      name: "User name",
      email: "11111@gmail.com",
      telNo: "0989999999",
      idCard: "",
    },
    {
      name: "User name",
      email: "11111@gmail.com",
      telNo: "0989999999",
      idCard: "",
    },
  ];
  return (
    <div className="flex w-full flex-col items-center justify-start gap-20 px-36 py-16">
      <h1 className="text-lightblue-900 text-3xl font-bold">
        รับรองเจ้าของสถานีเติมน้ำ
      </h1>
      <div className="grid w-full grid-cols-1 gap-12 xl:grid-cols-2">
        {userList.map((user, index) => (
          <UserCard key={index} {...user} />
        ))}
      </div>
    </div>
  );
}

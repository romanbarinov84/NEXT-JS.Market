

const ProfileHeader = ({name,surname}:{name:string;surname:string}) => {
  return (
    <div>
        <div className="bg-gradient-to-r from-[#ff6633] to-[#70c05b] px-8 text-white">
                        <h1 className="font-bold text-3xl">Профиль пользователя {name}{surname}</h1>
                        <p className="mt-2 opacity-90">
                            Управление учетной записью
                        </p>
                    </div>
    </div>
  )
}

export default ProfileHeader
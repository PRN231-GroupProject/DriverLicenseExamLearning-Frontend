'use client'
import React, {useState} from "react";
import {
    Navbar,
    NavbarBrand,
    NavbarContent,
    NavbarItem,
    Link,
    DropdownItem,
    DropdownTrigger,
    Dropdown,
    DropdownMenu,
    Avatar,
    NavbarMenuToggle, NavbarMenuItem, NavbarMenu
} from "@nextui-org/react";
import {selectUser, USER_LOGOUT_SUCCESS} from "@/redux/features/userSlice";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch} from "@/redux/store";
import {useRouter} from "next/navigation";

function Navigation () {
    const router = useRouter()
    const user = useSelector(selectUser);
    const dispatch = useDispatch<AppDispatch>();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const menuItems = [
        "courses",
        "test",
    ];

    const handleLogout = async () => {
        const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
        localStorage.removeItem("token");
        await delay(500);
        router.push('/login')
        dispatch(USER_LOGOUT_SUCCESS());
    };

    const handleProfile = () => {
        router.push(`/profile/${user.userAccountInfor.userId}`);
    };

    const handleHistory = () => {
        router.push(`/historyBooking`)
    }

    const handleTransaction = () => {
        router.push(`/history-transaction`)
    }

    const handleExam = () => {
        router.push(`/history-exam`)
    }

    const handleSendLicense = () => {
        router.push(`/send-license-application`)
    }

    return (
        <Navbar isBordered
                isMenuOpen={isMenuOpen}
                onMenuOpenChange={setIsMenuOpen}>

            <NavbarContent className="sm:hidden" justify="start">
                <NavbarMenuToggle aria-label={isMenuOpen ? "Close menu" : "Open menu"} />
            </NavbarContent>

            <NavbarBrand>
                <a href='/'  className="font-bold text-inherit text-decoration-none">Driven License Learning</a>
            </NavbarBrand>
            <NavbarContent className="hidden sm:flex gap-4" as='div' justify="center">
                {
                    user.userAccountInfor?.role?.roleName == "Mentor" ?
                        <NavbarItem>
                            <Link color="secondary" aria-current="page" href="/tracking">
                                Tracking
                            </Link>
                        </NavbarItem> :
                        <>
                            <NavbarItem>
                                <Link color="secondary" aria-current="page" href="/courses">
                                    Courses
                                </Link>
                            </NavbarItem>
                            <NavbarItem>
                                <Link href="/test/1" aria-current="page" color="secondary">
                                    Trial Test A1
                                </Link>
                            </NavbarItem>
                            <NavbarItem>
                                <Link href="/test/2" aria-current="page" color="secondary">
                                    Trial Test A2
                                </Link>
                            </NavbarItem>
                            <NavbarItem>
                                <Link href="/test/3" aria-current="page" color="secondary">
                                    Trial Test A3
                                </Link>
                            </NavbarItem>
                        </>
                }
            </NavbarContent>
            {
                user.isloggedInSuccess == true?
                    <NavbarContent as="div" justify="end">
                        <Dropdown placement="bottom-end">
                            <DropdownTrigger>
                                <Avatar
                                    isBordered
                                    as="button"
                                    classNames='opacity-100'
                                    color="secondary"
                                    name="Jason Hughes"
                                    size="sm"
                                    src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
                                />
                            </DropdownTrigger>

                            <DropdownMenu aria-label="Profile Actions" variant="flat">
                                <DropdownItem key="profile" textValue className="h-14 gap-2">
                                    <p className="font-semibold">{user.userAccountInfor.email}</p>
                                </DropdownItem>
                                {user.userAccountInfor?.role?.roleName === "Member" ?<DropdownItem key="history" onClick={() => handleHistory()}>
                                    Booking History
                                </DropdownItem>: null}
                                {user.userAccountInfor?.role?.roleName === "Member" ? <DropdownItem key="history_transaction" onClick={() => handleTransaction()}>
                                    Transaction History
                                </DropdownItem>: null}
                                {user.userAccountInfor?.role?.roleName === "Member" ? <DropdownItem key="history_transaction" onClick={() => handleExam()}>
                                    Exam History
                                </DropdownItem>: null}
                                {user.userAccountInfor?.role?.roleName === "Member" ? <DropdownItem key="license_application" onClick={() => handleSendLicense()}>
                                    Send license application
                                </DropdownItem> : null}
                                {user.userAccountInfor?.role?.roleName === "Member" ?
                                    <DropdownItem key="mentor-signup" onClick={() => router.push('/mentor-signup')}>
                                        Apply to mentor
                                    </DropdownItem>: null}
                                <DropdownItem key="team_settings" onClick={() => handleProfile()} textValue>My Profile</DropdownItem>
                                <DropdownItem key="logout" onClick={() => handleLogout()} color="danger" textValue>
                                    Log Out
                                </DropdownItem>
                            </DropdownMenu>
                                {/*{*/}

                                {/*    user.userAccountInfor?.role?.roleName === "Member" ?*/}

                                {/*        <DropdownMenu aria-label="Profile Actions" variant="flat">*/}
                                {/*            <DropdownItem key="profile" textValue className="h-14 gap-2">*/}
                                {/*                <p className="font-semibold">{user.userAccountInfor.email}</p>*/}
                                {/*            </DropdownItem>*/}
                                {/*            <DropdownItem key="history" onClick={() => handleHistory()}>*/}
                                {/*                History booking*/}
                                {/*            </DropdownItem>*/}
                                {/*            <DropdownItem key="history_transaction" onClick={() => handleTransaction()}>*/}
                                {/*                History transaction*/}
                                {/*            </DropdownItem>*/}
                                {/*            <DropdownItem key="license_application" onClick={() => handleSendLicense()}>*/}
                                {/*                Send license application*/}
                                {/*            </DropdownItem>*/}
                                {/*            <DropdownItem key="team_settings" onClick={() => handleProfile()} textValue>My Profile</DropdownItem>*/}
                                {/*            <DropdownItem key="logout" onClick={() => handleLogout()} color="danger" textValue>*/}
                                {/*                Log Out*/}
                                {/*            </DropdownItem>*/}
                                {/*        </DropdownMenu>*/}

                                {/*        :*/}

                                {/*        <DropdownMenu aria-label="Profile Actions" variant="flat">*/}
                                {/*            <DropdownItem key="profile" textValue className="h-14 gap-2">*/}
                                {/*                <p className="font-semibold">{user.userAccountInfor.email}</p>*/}
                                {/*            </DropdownItem>*/}
                                {/*            <DropdownItem key="team_settings" onClick={() => handleProfile()} textValue>My Profile</DropdownItem>*/}
                                {/*            <DropdownItem key="logout" onClick={() => handleLogout()} color="danger" textValue>*/}
                                {/*                Log Out*/}
                                {/*            </DropdownItem>*/}
                                {/*        </DropdownMenu>*/}


                                {/*}*/}

                        </Dropdown>
                    </NavbarContent>
                    :
                    <NavbarContent as="div" justify="end">
                        <NavbarItem>
                            <Link color="secondary" aria-current="page" href="/login">
                                Login
                            </Link>
                        </NavbarItem>
                        <NavbarItem>
                            <Link href="/signup" aria-current="page" color="secondary">
                                Register
                            </Link>
                        </NavbarItem>
                    </NavbarContent>
            }


            <NavbarMenu>
                {menuItems.map((item, index) => (
                    <NavbarMenuItem key={`${item}-${index}`}>
                        <Link
                            className="w-full"
                            color={
                                'foreground'
                            }
                            href={`/${item}`}
                            size="lg"
                        >
                            {item}
                        </Link>
                    </NavbarMenuItem>
                ))}
            </NavbarMenu>
        </Navbar>
    );

};

export default Navigation;
import './App.css';
import {TwitterFollowCard} from "./TwitterFollowCard.jsx";

export function App() {
    const formatUserName = (userName) => `@${userName}`;
    const userNameList = [
        {
            userName: 'frankesau',
            name: 'Miguel Angel Duran',
            initialIsFollowing: true,
            key: 1
        },
        {
            userName: '_fRomana',
            name: 'Miguel Angel Duran',
            initialIsFollowing: false,
            key: 2
        },
        {
            userName: 'frankesau',
            name: 'Miguel Angel Duran',
            initialIsFollowing: true,
            key: 3
        }
    ]

    return (
        <section className="App">
            {
                userNameList.map(({userName, name, initialIsFollowing}) => (
                    <TwitterFollowCard
                        userName={userName}
                        name={name}
                        initialIsFollowing={initialIsFollowing}
                        formatUserName={formatUserName}
                    ></TwitterFollowCard>
                ))
            }
        </section>
    );
}
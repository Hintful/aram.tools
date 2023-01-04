import React from 'react';
import { ChallengesConfig } from '../../../common/data/ChallengesConfig';

function LeaderboardItem(props) {

    return (
        <div class="flex flex-col items-center">
            <h2 class="font-bold Inter">{ ChallengesConfig[props.id].name }</h2>

        </div>
    )
}

export default LeaderboardItem;
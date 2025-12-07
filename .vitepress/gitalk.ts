import Gitalk from 'gitalk';
import 'gitalk/dist/gitalk.css';

export default function createGitalk(path: string) {
    const gitalk = new Gitalk({
        clientID: 'Ov23liR6kBOvlXjI8tlF',
        clientSecret: 'b84bae89c2205e6a95c6629fb3fb62234fa8d984',
        repo: 'syq',
        owner: 'Lisk809',
        admin: ['Lisk809'],
        id: path,      // 确保唯一性和长度小于 50
        distractionFreeMode: false  // 类似 facebook 的无干扰模式
    });
    gitalk.render('gitalk-container');
}
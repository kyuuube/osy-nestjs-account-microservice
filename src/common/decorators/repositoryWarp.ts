export function repositoryWarp() {
    return (target, key, descriptor) => {
        console.log(target, key, descriptor)
    }
}

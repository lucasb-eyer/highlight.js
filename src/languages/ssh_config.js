/*
Language: ssh_config
Category: common
*/

function(hljs) {
  return {
    case_insensitive: true,
    contains: [
      {
        className: 'comment',
        begin: '#', end: '$',
      },
      {
        className: 'parent',
        begin: /^host/,
        starts: {end: '$', className: 'value', relevance: 0},
      },
      {
        className: 'keyword',
        begin: /^\s*(AddressFamily|BatchMode|BindAddress|ChallengeResponseAuthentication|CheckHostIP|Cipher|Ciphers|ClearAllForwardings|Compression|CompressionLevel|ConnectTimeout|ConnectionAttempts|ControlMaster|ControlPath|ControlPersist|DynamicForward|EnableSSHKeysign|EscapeChar|ExitOnForwardFailure|ForwardAgent|ForwardX11|ForwardX11Timeout|ForwardX11Trusted|GSSAPIAuthentication|GSSAPIClientIdentity|GSSAPIDelegateCredentials|GSSAPIKeyExchange|GSSAPIRenewalForcesRekey|GSSAPIServerIdentity|GSSAPITrustDNS|GSSAPITrustDns|GatewayPorts|GlobalKnownHostsFile|HashKnownHosts|HostKeyAlgorithms|HostKeyAlias|HostName|HostbasedAuthentication|IPQoS|IdentitiesOnly|IdentityFile|KbdInteractiveAuthentication|KbdInteractiveDevices|KexAlgorithms|LocalCommand|LocalForward|LogLevel|MACs|NoHostAuthenticationForLocalhost|NumberOfPasswordPrompts|PKCS11Provider|PasswordAuthentication|PermitLocalCommand|Port|PreferredAuthentications|Protocol|ProxyCommand|PubkeyAuthentication|RSAAuthentication|RekeyLimit|RemoteForward|RequestTTY|RhostsRSAAuthentication|SendEnv|ServerAliveCountMax|ServerAliveInterval|SmartcardDevice|StrictHostKeyChecking|TCPKeepAlive|Tunnel|TunnelDevice|UseBlacklistedKeys|UsePrivilegedPort|User|UserKnownHostsFile|VerifyHostKeyDNS|VisualHostKey|XAuthLocation)/,
        starts: {end: '$', className: 'value', relevance: 0},
      }
    ]
  };
}

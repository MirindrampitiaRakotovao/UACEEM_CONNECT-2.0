import { Phone, PhoneOff, Mic, MicOff, Video, VideoOff, MessageSquare } from 'lucide-react';
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';


// Configuration WebRTC
const configuration = {
  iceServers: [
    { urls: 'stun:stun.l.google.com:19302' },
    // Ajoutez vos TURN servers ici
  ]
};
interface VideoCallProps {
  conversation: any;
  onClose: () => void;
}
const VideoCallInterface: React.FC<VideoCallProps> = ({ 
  conversation, 
  onClose 
}) => {
  const [isMicMuted, setIsMicMuted] = useState(false);
  const [isCameraOff, setIsCameraOff] = useState(false);
  const [callStatus, setCallStatus] = useState<'connecting' | 'connected' | 'disconnected'>('connecting');
  // Références pour les flux vidéo
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);
  // Références pour les connexions WebRTC
  const peerConnectionRef = useRef<RTCPeerConnection | null>(null);
  const localStreamRef = useRef<MediaStream | null>(null);
  // Initialisation de l'appel
  useEffect(() => {
    const startCall = async () => {
      try {
        // Obtenir l'accès à la caméra et au micro
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true
        });
        if (localVideoRef.current) {
          localVideoRef.current.srcObject = stream;
        }
        localStreamRef.current = stream;
        // Créer la connexion WebRTC
        const peerConnection = new RTCPeerConnection(configuration);
        // Ajouter les tracks du flux local
        stream.getTracks().forEach(track => {
          peerConnection.addTrack(track, stream);
        });
        // Gestion des tracks distants
        peerConnection.ontrack = (event) => {
          if (remoteVideoRef.current) {
            remoteVideoRef.current.srcObject = event.streams[0];
          }
          setCallStatus('connected');
        };
        // Gestion des candidats ICE
        peerConnection.onicecandidate = (event) => {
          if (event.candidate) {
            // Envoyer le candidat à l'autre partie (via votre signaling server)
            // sendCandidateToRemotePeer(event.candidate)
          }
        };
        peerConnectionRef.current = peerConnection;
        // Créer l'offre
        const offer = await peerConnection.createOffer();
        await peerConnection.setLocalDescription(offer);
        // Envoyer l'offre à l'autre partie
        // sendOfferToRemotePeer(offer)
      } catch (error) {
        console.error('Erreur lors de l\'initialisation de l\'appel', error);
        onClose();
      }
    };
    startCall();
    // Nettoyage
    return () => {
      localStreamRef.current?.getTracks().forEach(track => track.stop());
      peerConnectionRef.current?.close();
    };
  }, []);
  // Contrôles d'appel
  const toggleMicrophone = () => {
    if (localStreamRef.current) {
      const audioTracks = localStreamRef.current.getAudioTracks();
      audioTracks.forEach(track => {
        track.enabled = isMicMuted;
      });
      setIsMicMuted(!isMicMuted);
    }
  };
  const toggleCamera = () => {
    if (localStreamRef.current) {
      const videoTracks = localStreamRef.current.getVideoTracks();
      videoTracks.forEach(track => {
        track.enabled = isCameraOff;
      });
      setIsCameraOff(!isCameraOff);
    }
  };
  const endCall = () => {
    localStreamRef.current?.getTracks().forEach(track => track.stop());
    peerConnectionRef.current?.close();
    onClose();
  };
  return (
    <div className="fixed inset-0 z-50 bg-black flex flex-col">
      {/* Flux vidéo */}
      <div className="flex-1 relative">
        {/* Vidéo distante */}
        <video 
          ref={remoteVideoRef}
          autoPlay 
          className="absolute inset-0 w-full h-full object-cover"
        />
        
        {/* Flux local en petit */}
        <video 
          ref={localVideoRef}
          autoPlay 
          muted
          className="absolute bottom-4 right-4 w-1/4 h-auto rounded-lg border-2 border-white z-10"
        />
        {/* Informations de l'appel */}
        <div className="absolute top-4 left-4 text-white">
          <h2 className="text-xl font-bold">{conversation.sender}</h2>
          <p>{callStatus === 'connecting' ? 'Connexion...' : 'En ligne'}</p>
        </div>
      </div>
      {/* Contrôles d'appel */}
      <div className="bg-black bg-opacity-50 p-4 flex justify-center space-x-4">
        <motion.button
          onClick={toggleMicrophone}
          whileTap={{ scale: 0.9 }}
          className={`
            p-3 rounded-full 
            ${isMicMuted ? 'bg-red-500' : 'bg-gray-700'}
          `}
        >
          {isMicMuted ? <MicOff color="white" /> : <Mic color="white" />}
        </motion.button>
        <motion.button
          onClick={toggleCamera}
          whileTap={{ scale: 0.9 }}
          className={`
            p-3 rounded-full 
            ${isCameraOff ? 'bg-red-500' : 'bg-gray-700'}
          `}
        >
          {isCameraOff ? <VideoOff color="white" /> : <Video color="white" />}
        </motion.button>
        <motion.button
          onClick={endCall}
          whileTap={{ scale: 0.9 }}
          className="p-3 bg-red-500 rounded-full"
        >
          <PhoneOff color="white" />
        </motion.button>
      </div>
    </div>
  );
};
export default VideoCallInterface;